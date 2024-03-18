interface InputProps {
  type: string;
  value: string;
  name: string;
  id?: string;
  className?: string;
  label?: string;
  placeholder?: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const index = ({
  type,
  id,
  className,
  label,
  name,
  value,
  placeholder,
  handleInputChange,
}: InputProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label className="text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={handleInputChange}
        className={`focus-within:border-slate-600 w-full text-sm p-3.5 py-3 rounded-md outline-none border ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default index;
