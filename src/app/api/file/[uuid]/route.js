const { NextResponse } = require("next/server");
import { File } from "@/models/file";

export const GET = () => {
  const data = [
    {
      id: 101,
      name: "Folder 1",
      type: "folder",
      uuid: "1",
      children: [
        {
          name: "File 1",
          uuid: "2",
        },
        {
          name: "Folder 2",
          uuid: "3",

          id: 102,

          type: "folder",

          children: [
            {
              name: "File 2",
              uuid: "4",
            },
          ],
        },
      ],
    },
    {
      name: "Folder 2",
      uuid: "5",

      id: 103,

      type: "folder",

      children: [
        {
          name: "File 1",
          uuid: "6",
        },
        {
          name: "File 2",
          uuid: "7",
        },
        {
          name: "Folder 2",
          uuid: "8",

          id: 104,

          type: "folder",

          children: [
            {
              name: "File 2",
              uuid: "9",
            },
            {
              id: 110,
              name: "kirtikumar",
              type: "folder",
              uuid: "10",

              children: [
                {
                  name: "files 100",
                  uuid: "11",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Folder 3",
      id: 105,
      uuid: "12",

      type: "folder",

      children: [
        {
          name: "File 1",
          uuid: "13",
        },
        {
          name: "Folder 2",
          id: 106,
          uuid: "14",

          type: "folder",

          children: [
            {
              name: "File 2",
              uuid: "15",
            },
          ],
        },
      ],
    },
  ];
  return NextResponse.json(data);
};

export const POST = async (req, { params }) => {
  try {
    const data = await req.json();
    const saveFileContentWithUuid = {
      fileContent: data.fileContent,
      uuid: params.uuid,
    };
    const savingFileContent = new File(saveFileContentWithUuid);
    await savingFileContent.save();
    return NextResponse.json({ message: "file saved Success" },{status:200});
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "something went wrong" },{status:400});

  }
};
