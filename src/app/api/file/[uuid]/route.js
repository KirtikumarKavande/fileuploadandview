const { NextResponse } = require("next/server");
import { FileContent } from "@/models/file";
export const GET = async (req, { params }) => {
  try {
    const data = await FileContent.findOne({ uuid: params.uuid });
    if (data) {
      return NextResponse.json({
        success: true,
        data: { fileContent: data.fileContent },
      });
    } else {
      return NextResponse.json({
        success: true,
        data: { fileContent:""},
      });
    }
  } catch (err) {
    return NextResponse.json(
      { message: "something went wrong", success: false },
      { status: 400 }
    );
  }
};

export const POST = async (req, { params }) => {
  try {
    const data = await req.json();

    const isFileContentExists = await FileContent.find({ uuid: params.uuid });
    console.log("isFileContentExists",isFileContentExists)
    if (isFileContentExists.length>0) {
      await FileContent.updateOne(
        { uuid: params.uuid },
        { fileContent: data.fileContent }
      );
      return NextResponse.json(
        { message: "file saved Success", success: true },
        { status: 200 }
      );
    } else {
      console.log("logged...")
      const saveFileContentWithUuid = {
        fileContent: data.fileContent,
        uuid: params.uuid,
      };
      const savingFileContent = new FileContent(saveFileContentWithUuid);
      await savingFileContent.save();
      return NextResponse.json(
        { message: "file saved Success", success: true },
        { status: 200 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong", success: false },
      { status: 400 }
    );
  }
};
