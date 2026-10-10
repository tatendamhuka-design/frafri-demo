import DestinationForm from "../DestinationForm";

export default function NewDestinationPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold" style={{ color: "#0a0a0a" }}>
        New Destination
      </h1>
      <p className="mt-1 text-sm" style={{ color: "#6b7280" }}>
        Fill in the details below.
      </p>
      <div className="mt-6">
        <DestinationForm />
      </div>
    </div>
  );
}