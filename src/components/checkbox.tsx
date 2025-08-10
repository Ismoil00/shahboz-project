import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

interface CustomCheckboxProps {
  checked: boolean;
  onChange?:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined;
  disabled?: boolean;
}

export default function CustomCheckbox({
  checked,
  onChange,
  disabled = false,
}: CustomCheckboxProps) {
  return (
    <div>
      <Checkbox
        {...label}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        className="custom-checkbox"
      />
    </div>
  );
}
