export default function Shoppinglist(props){
    return (
        <section>
            <p>name: {props.name}</p>
            <p>quantity: {props.quantity}</p>
            <p>category: {props.category}</p>
        </section>

    );
}