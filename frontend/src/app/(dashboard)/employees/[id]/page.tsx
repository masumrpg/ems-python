export default function EmployeeDetailsPage({params}: { params: { id: string } }) {
    return <div>Employee ID: {params.id}</div>;
}