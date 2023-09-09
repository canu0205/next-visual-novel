import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-3 text-white">
        <CircularProgress color="inherit" />
        <div className="text-xl font-semibold text-white">
          Please waiting...
        </div>
      </div>
    </>
  );
}
