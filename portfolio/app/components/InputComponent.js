export default function InputField({
    placeholder,
    type,
    value,
    onChange
}) {

    return (
        <input
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
            className="border border-black p-2 rounded"
        />
    );
}