import { useState } from "react";
import { Button } from "../components/Button";

const menuItems = [
  { id: 1, name: "Chicken Kosa", price: 200 },
  { id: 2, name: "Basanti Pulao", price: 120 },
  { id: 3, name: "Paneer Butter Masala", price: 180 },
  { id: 4, name: "Tandoori Roti", price: 20 },
];

export default function OrderPortal() {
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [orderDetails, setOrderDetails] = useState({ name: "", address: "", phone: "", payment: "COD" });

  const addToCart = (item) => {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      setCart(cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    const existing = cart.find(i => i.id === item.id);
    if (existing.quantity === 1) {
      setCart(cart.filter(i => i.id !== item.id));
    } else {
      setCart(cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i));
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = () => {
    const itemsList = cart.map(i => `${i.name} x${i.quantity}`).join(", ");
    const message = `New Order from OWL BITE 🦉%0AName: ${orderDetails.name}%0APhone: ${orderDetails.phone}%0AAddress: ${orderDetails.address}%0AItems: ${itemsList}%0ATotal: ₹${total}%0APayment: ${orderDetails.payment}`;
    const whatsappNumber = "918595545004";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappURL, "_blank");
    setCart([]);
    setCheckout(false);
    setOrderDetails({ name: "", address: "", phone: "", payment: "COD" });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🦉 OWL BITE - Order Online</h1>

      {!checkout ? (
        <>
          <div className="grid grid-cols-1 gap-4">
            {menuItems.map((item) => (
              <div key={item.id} className="border p-4 flex justify-between items-center rounded">
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => removeFromCart(item)}>-</Button>
                  <span>{cart.find(i => i.id === item.id)?.quantity || 0}</span>
                  <Button onClick={() => addToCart(item)}>+</Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-bold">🛒 Cart</h2>
            {cart.length === 0 ? <p>No items yet</p> : (
              <>
                <ul className="list-disc ml-5">
                  {cart.map((item) => (
                    <li key={item.id}>{item.name} x{item.quantity} - ₹{item.price * item.quantity}</li>
                  ))}
                </ul>
                <p className="mt-2 font-bold">Total: ₹{total}</p>
                <Button className="mt-3" onClick={() => setCheckout(true)}>Proceed to Checkout</Button>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-3">Checkout</h2>
          <input
            type="text"
            placeholder="Your Name"
            className="border p-2 w-full mb-2 rounded"
            value={orderDetails.name}
            onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="border p-2 w-full mb-2 rounded"
            value={orderDetails.phone}
            onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
          />
          <textarea
            placeholder="Delivery Address"
            className="border p-2 w-full mb-2 rounded"
            value={orderDetails.address}
            onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
          />
          <select
            className="border p-2 w-full mb-2 rounded"
            value={orderDetails.payment}
            onChange={(e) => setOrderDetails({ ...orderDetails, payment: e.target.value })}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="UPI">UPI / Online Payment</option>
          </select>
          <p className="font-bold mb-2">Total: ₹{total}</p>
          <Button onClick={placeOrder} className="w-full">Place Order via WhatsApp</Button>
        </div>
      )}
    </div>
  );
}