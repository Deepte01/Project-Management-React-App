import NewTask from "./NewTask";

export default function Tasks()
{
    return <section>
        <h2 className="text-2xl font-bold text-stone-700 mb-4">TASKS</h2>
        <NewTask></NewTask>
        <p className="text-stone-800 mb-4">This project does not have any tasks yet..</p>
        <ul>

        </ul>
    </section>
}