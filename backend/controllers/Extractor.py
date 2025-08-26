try:
    import sys
    from pymongo import MongoClient
    import xlwings as xw
    from datetime import datetime, timezone

    import os

    wb = None
    sheet = None

    classes = []
    rngArr = []
    break_point = 0

    daysArr = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

    alpha = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ]

    client = MongoClient(
        "mongodb+srv://himanshudeolia0825:1hqVCAshDg50eFiD@cluster0.0cosamw.mongodb.net"
    )

    # Select the database and collection
    db = client["Venue"]
    # print("db",db)
    collection = db["timetable"]

    # **********************************     ABOVE THIS LINE ARE THE GLOBAL VARIABLES 
    #  
    def open_and_load_Excel(filename, sheetname):

        global wb, sheet

        wb = xw.Book(filename)
        sheet = wb.sheets[sheetname]
        print("Workbook opened:", wb)
        print("Sheet:", sheet)

    def unmerger_and_copy(sheet):

        # Define the specific range to unmerge and copy values
        specific_range = sheet.range("A1:AH285")

        # Loop through merged cells in the range
        for cell in specific_range:
            if cell.api.MergeCells:  # Check if the cell is merged
                merged_range = cell.api.MergeArea  # Get the merged range
                value = merged_range.Cells(1, 1).Value  # Get the original value

                merged_range.UnMerge()  # Unmerge the cells

                #         # Fill all previously merged cells with the original value
                for sub_cell in merged_range:
                    sub_cell.Value = value

    def range_And_Classes_Extractor(sheet):
        global classes, rngArr

        b_column_range = sheet.range("B3").expand("down")

        for cell in b_column_range:
            cls = cell.value
            if not cls:
                continue
            if "CLASS" in str(cls).upper():
                continue
            if cls not in classes:
                classes.append(cls)

        # ✅ Fixed ranges for each day
        rngArr = [
        "B3:Z47",    # Monday
        "B48:Z90",   # Tuesday
        "B91:Z134",  # Wednesday
        "B135:Z177", # Thursday
        "B178:Z219", # Friday
        "B220:Z261"  # Saturday
        ]

        sheet.range("DY1").value = "BCA-1A"
        print("Classes Extracted:", classes)
        print("Ranges:", rngArr)

    def create_v_lookup(sheet):

        for row in range(6):

            for i in range(21):

                if i >= 6:
                    pickup = i + 3
                else:
                    pickup = i + 2
                print(f"E{alpha[i]}{row+1}",end=" ")

                print(f"=VLOOKUP(DY1,{rngArr[row]},{i+2},0)",end="  |")

                sheet.range(f"E{alpha[i]}{row+1}").value = (
                f"=VLOOKUP(DY1,{rngArr[row]},{pickup},0)"
                )

    def write_days(sheet):

        for i in range(6):
            sheet.range(f"DZ{i+1}").value = daysArr[i]

    def AddToMongo(doc):
        # print("doc",doc)
        try:
            # Connect to the MongoDB server
            global collection

            # Insert the document into the collection
            result = collection.insert_one(doc)

            print(doc)

            # Return the inserted document's ID
            return result.inserted_id
        except Exception as e:
            print(f"An error occurred: {e}")
            return None

    def extract_and_update(sheet):
        tt_one_day = []
        one_lec_data = []
        extracted_tt = []

        for cls in classes:

            # Update the value of cell BQ2
            sheet.range("DY1").value = cls

            # Force recalculation
            wb.app.calculate()

            for daynum in range(6):
                for i in range(21):
                    # print(sheet.range(f"E{alpha[i]}1").value, end="  ")

                    one_lec_data.append(sheet.range(f"E{alpha[i]}{daynum+1}").value)

                    i = i + 1

                    if i % 3 == 0:
                        tt_one_day.append(one_lec_data)
                        # print("   |   ", end="")
                        one_lec_data = []

                # print(tt_one_day)

                for lecnum, lec in enumerate(tt_one_day):
                    # print(lec)

                    if lec == [0.0, 0.0, 0.0]:
                        tt_one_day[lecnum] = ["It's", "Free", "Lecture"]
                    elif (
                        lec == ["PLACEMENT SESSION", 0.0, 0.0]
                        or lec
                        == [
                            "PLACEMENT SESSION",
                            "PLACEMENT SESSION",
                            "PLACEMENT SESSION",
                        ]
                        or lec
                        == [
                            "Placement Session",
                            "Placement Session",
                            "Placement Session",
                        ]
                    ):
                        tt_one_day[lecnum] = ["It's", "Placement", "Session"]
                    elif (
                        lec == ["LUNCH BREAK", 0.0, 0.0]
                        or lec == ["LUNCH BREAK", "LUNCH BREAK", "LUNCH BREAK"]
                        or lec == ["Lunch Break", "Lunch Break", "Lunch Break"]
                    ):
                        tt_one_day[lecnum] = ["It's", "Lunch", "Break"]
                    elif (
                        lec == ["FRIDAY MEETING", 0.0, 0.0]
                        or lec == ["FRIDAY MEETING", "FRIDAY MEETING", "FRIDAY MEETING"]
                        or lec == ["Friday Meeting", "Friday Meeting", "Friday Meeting"]
                    ):
                        tt_one_day[lecnum] = ["It's", "Friday", "Meeting"]

                    elif (
                        lec == ["DEPARTMENTAL MEETING", 0.0, 0.0]
                        or lec
                        == [
                            "DEPARTMENTAL MEETING",
                            "DEPARTMENTAL MEETING",
                            "DEPARTMENTAL MEETING",
                        ]
                        or lec
                        == [
                            "Departmental Meeting",
                            "Departmental Meeting",
                            "Departmental Meeting",
                        ]
                    ):
                        tt_one_day[lecnum] = ["It's", "Departmental", "Meeting"]
                # tt_of_one_class[daysArray[daynum]] = tt_one_day
                # print(tt_one_day)

                extracted_tt = tt_one_day
                tt_one_day = []

                AddToMongo(
                    {
                        "class": cls.replace(" ", "-").replace(".", "").upper(),
                        "day": sheet.range(f"DZ{daynum+1}").value,
                        "timetable": extracted_tt,
                        "time": datetime.now(
                            timezone.utc
                        ),  # Recommended way to store time in UTC
                    }
                )
            # print("DZ",daynum+1,sheet.range(f"DZ{daynum+1}").value)

    # filename =  os.getcwd()+"../uploads/"+ sys.argv[1]
    filename = f"{os.getcwd()}\\uploads\\{sys.argv[1]}"
    filename1 = os.path.join(os.getcwd(), "uploads", sys.argv[1])
    print("filename",filename)
    print("filename d",filename1)

    open_and_load_Excel(filename, "Sheet1")
    print("Outside:", wb, sheet)

    unmerger_and_copy(sheet)

    range_And_Classes_Extractor(sheet)

    create_v_lookup(sheet)

    write_days(sheet)

    collection.drop()

    extract_and_update(sheet)

    if wb:
        wb.save()
        wb.close()

    """"

    1. Sheet number should be fixed
    2. The classes should be in Capital letters
    3. The classes must be separated by  "-" . no spaces (E.g => BTECH-3A-GP1)
    4. The other block data should be there
    5. All the classes must be listed even if they have holiday at that day
    6. All the days of week must have exact same number of classes

    """

except :
      if wb:  
            wb.save()
            wb.close()
   