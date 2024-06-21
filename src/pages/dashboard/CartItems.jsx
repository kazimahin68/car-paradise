import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CartItems = () => {
  const [cart, refetch] = useCart();
  console.log(cart);
  const [axiosSecure] = useAxiosSecure()
  // console.log(_id, brand_name, carId, buyer_email, model, price, img_url)

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Remove it from cart items",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/cars/cartItem/${id}`).then((res) => {
          console.log("delete res", res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Removed!", "Your item has been removed.", "success");
          }
        });
      }
    });
  };
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Name & Model</th>
            <th>Price</th>
            <th>Action</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {cart.map((cartItem, index) => (
            <tr key={cartItem._id}>
              <td className="font-bold">{index + 1}</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={cartItem.img_url} alt="cart item" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{cartItem.brand_name}</div>
                    <div className="text-sm opacity-50">{cartItem.model}</div>
                  </div>
                </div>
              </td>
              <td className="font-bold">
                {cartItem.price}$
                <br />
                <span className="badge badge-ghost badge-sm p-2 font-normal">
                  Available Quantity: {cartItem.available_quantity}
                </span>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(cartItem._id)}
                  className="btn bg-red-600 btn-sm"
                >
                  Delete
                </button>
              </td>
              <th>
                <button className="btn bg-green-600 btn-sm">Pay</button>
              </th>
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th>#</th>
            <th>Name & Model</th>
            <th>Price</th>
            <th>Action</th>
            <th>Payment</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CartItems;
