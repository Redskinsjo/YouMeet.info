import { MenuItem } from "@mui/material";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { purple } from "@mui/material/colors";
import { NewFieldProps } from "@youmeet/types/form/fields/NewFieldProps";
import phoneCodes from "@youmeet/raw-data/phoneCodes.json";
import dynamic from "next/dynamic";

const SimpleField = dynamic(() => import("./SimpleField"), {
  ssr: false,
});

export default function PhoneField({
  name,
  label,
  type,
  value,
  required,
  errors,
  phonecode,
  setError,
  clearErrors,
  setValue,
}: NewFieldProps) {
  return (
    <div className="flex w-full gap-[3px]">
      <div className="w-[220px] xs:w-[130px] sm:w-[130px]">
        <SimpleField
          name="phonecode"
          type={type}
          label="Code"
          value={phonecode as string}
          required={required}
          select
          setValue={setValue}
          errors={errors}
          setError={setError}
          clearErrors={clearErrors}
        >
          {phoneCodes.map((c) => (
            <MenuItem key={c.name} value={c.dial_code}>
              <div className="flex-bet w-full box-border">
                <div>{c.name}</div>

                <div className="w-full flex items-center justify-end text-purple500">
                  <BsFillArrowUpCircleFill
                    style={{
                      display: "none",
                      margin: "0px 6px",
                      color: purple[100],
                    }}
                    className="me-profile-phonecode-menu-icon"
                  />
                  {c.dial_code}
                </div>
              </div>
            </MenuItem>
          ))}
        </SimpleField>
      </div>
      <SimpleField
        label={label}
        name={name}
        type={type}
        value={value}
        required={required}
        errors={errors}
        setError={setError}
        clearErrors={clearErrors}
      />
    </div>
  );
}
