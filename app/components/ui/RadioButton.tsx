const RadioButton = ({
  value,
  checked,
  onChange,
}: {
  value: string;
  checked: boolean;
  onChange?: (value: string) => void;
}) => {
  return (
    <label className="flex items-center">
      <input
        type="radio"
        name="difficulty"
        value={value}
        checked={checked}
        onChange={() => onChange?.(value)}
        className="sr-only peer"
      />
      <span
        className="px-6 py-2 rounded-full bg-neutral-800 border border-gray-600 text-white text-xs cursor-pointer peer-checked:bg-red-500 peer-checked:border-red-500 transition-all capitalize font-semibold"
        style={{
          boxShadow: checked
            ? "0 0 20px rgba(239, 68, 68, 0.6), 0 0 40px rgba(239, 68, 68, 0.3)"
            : "none",
          color: checked ? "white" : "#a6acb6",
        }}
      >
        {value}
      </span>
    </label>
  );
};

export default RadioButton;
