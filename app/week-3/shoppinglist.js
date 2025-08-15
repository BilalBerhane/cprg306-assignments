export default function Shoppinglist(props){
    return (
        <section className="bg-amber-600">
            <p>name: {props.name}</p>
            <p>quantity: {props.quantity}</p>
            <p>category: {props.category}</p>
        </section>

    );
}