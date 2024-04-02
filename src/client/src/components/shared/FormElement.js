export default function FormElement(props) {
  return (
    <div className="my-2 space-y-2 flex flex-col">
      <label>{props.label}</label>
      <input
        className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </div>
  );
}
