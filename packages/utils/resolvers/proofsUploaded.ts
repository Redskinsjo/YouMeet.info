import { Avatar, VerificationRequestInput } from "@youmeet/gql/generated";
import prisma from "@youmeet/prisma-config/prisma";
import { v2 as cloudinary } from "cloudinary";

const processUpload = async (filename: string | undefined, file: any) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
      filename_override: filename,
      use_filename: true,
      folder: "youmeet-official",
    });

    return {
      asset_id: result.asset_id,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      created_at: result.created_at,
      url: result.url,
      secure_url: result.secure_url,
      folder: result.folder,
      original_filename: result.original_filename,
    };
  } catch (error) {
    console.log("error", error);
  }
};

const classicUpload = async (data: VerificationRequestInput) => {
  const getUploadedProof = async (
    proofs: any[],
    filename: string | undefined
  ) => {
    const uploadedList = [] as Avatar[];
    for (let i = 0; i < proofs?.length; i++) {
      const proof = proofs[i];
      const uploaded = await processUpload(filename, proof);
      if (uploaded) uploadedList.push(uploaded);
    }
    return uploadedList;
  };

  const origin = await prisma.betausers.findFirst({
    where: { id: data.originId as string },
  });

  let filename = undefined;
  if (origin?.fullname) filename = origin?.fullname;
  else if (origin?.firstname && origin?.lastname)
    filename = `${origin?.firstname} ${origin?.lastname}`;

  let academicUploaded = (await getUploadedProof(
    data.academicProofs as any[],
    filename
  )) as Avatar[];
  let professionalUploaded = (await getUploadedProof(
    data.professionalProofs as any[],
    filename
  )) as Avatar[];
  let judiciaryUploaded = (await getUploadedProof(
    data.judiciaryProofs as any[],
    filename
  )) as Avatar[];

  return { academicUploaded, professionalUploaded, judiciaryUploaded };
};

export const proofsUploaded = async (data: VerificationRequestInput) => {
  return await classicUpload(data);
};
