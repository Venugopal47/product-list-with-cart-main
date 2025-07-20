const dataPath = "./data.json";
const items = document.getElementById("items");
const cartBox = document.getElementById("cartBox");

items.addEventListener("click", cartCliking);
items.addEventListener("click", increaseAndDecreaseItems);
cartBox.addEventListener("click", removeItemFromCart);
cartBox.addEventListener("click", confirmOrder);

const IMAGES={
    addToCart:"./assets/images/icon-add-to-cart.svg",
    decrement:"./assets/images/icon-decrement-quantity.svg",
    increment:"./assets/images/icon-increment-quantity.svg",
    removeItem:"./assets/images/icon-remove-item.svg",
    orderConfirmed:"./assets/images/icon-order-confirmed.svg",
    carbonNeutral:"./assets/images/icon-carbon-neutral.svg"
}

let data = [];

window.addEventListener("load", loadContents);

async function loadContents() {
    try {
        const response = await fetch(dataPath);
        const menuData = await response.json();
        items.innerHTML="";
        menuData.forEach(item => {
            createItem(item);
        });
    }
    catch (error) {
        console.log(error);
    }
}

function createItem(item) {
    const dessert = document.createElement("div");
    const mobileImage = document.createElement("img");
    const tabletImage = document.createElement("img");
    const desktopImage = document.createElement("img");
    const thumbnailImage = document.createElement("img");
    const div = document.createElement("div");
    const cartButton = document.createElement("button");
    const cartImage = document.createElement("img");
    const details = document.createElement("div");
    const category = document.createElement("p");
    const name = document.createElement("p");
    const price = document.createElement("p");
    const number = document.createElement("span");

    dessert.classList.add("dessert");
    mobileImage.classList.add("image", "md:hidden", "rounded-xl");
    tabletImage.classList.add("image", "hidden", "md:block", "lg:hidden", "rounded-xl");
    desktopImage.classList.add("image", "hidden", "lg:block", "rounded-xl");
    thumbnailImage.classList.add("thumbnail", "hidden", "rounded-xl");
    mobileImage.setAttribute("src", item.image.mobile);
    tabletImage.setAttribute("src", item.image.tablet);
    desktopImage.setAttribute("src", item.image.desktop);
    thumbnailImage.setAttribute("src", item.image.thumbnail);
    div.classList.add("cartParent", "relative", "mb-10");
    cartImage.setAttribute("src", IMAGES.addToCart);
    cartImage.classList.add("mr-2");
    cartButton.innerText = "Add to Cart";
    cartButton.classList.add("cart", "text-rose900", "font-[600]", "bg-white", "rounded-full", "py-3", "w-1/2", "flex", "flex-row-reverse", "justify-center", "border", "border-rose500", "absolute", "left-1/2", "-translate-1/2", "hover:cursor-pointer", "hover:border-red", "hover:border-2");
    category.classList.add("category", "text-rose400", "font-[400]");
    category.innerText = item.category;
    name.classList.add("name", "text-rose900", "font-[600]");
    name.innerText = item.name;
    price.classList.add("text-red", "font-[600]");
    price.innerText = "$";
    number.classList.add("price");
    number.innerText = (item.price).toFixed(2)


    details.appendChild(category);
    details.appendChild(name);
    price.appendChild(number);
    details.appendChild(price);
    cartButton.appendChild(cartImage);
    div.appendChild(cartButton);
    dessert.appendChild(mobileImage);
    dessert.appendChild(tabletImage);
    dessert.appendChild(desktopImage);
    dessert.appendChild(thumbnailImage);
    dessert.appendChild(div);
    dessert.appendChild(details);
    items.appendChild(dessert);
}

function cartCliking(e) {
    const element = e.target;
    const cart = element.closest(".cart");
    if (cart) {
        const dessert = cart.closest(".dessert");
        cart.classList.add("hidden");
        createAddAndRemoveButton(dessert);
        const emptyCart = cartBox.querySelector("#emptyCart");
        if (!emptyCart.classList.contains("hidden")) {
            emptyCart.classList.add("hidden");
            createCartDetails();
        }
        const itemName = dessert.querySelector(".name").innerText;
        const itemPrice = Number(dessert.querySelector(".price").innerText);
        const thumbnailImage = dessert.querySelector(".thumbnail").getAttribute("src");
        const item = { name: itemName, price: itemPrice, count: 1, thumbnail: thumbnailImage };
        data.push(item);
        updateCartDetails();
        dessert.querySelectorAll(".image").forEach(image => {
            image.classList.add("border-red", "border-2");
        });
    }
}


function createAddAndRemoveButton(item) {
    const cartParent = item.querySelector(".cartParent");
    const element = document.createElement("div");
    const decrementButton = document.createElement("button");
    const decrementImage = document.createElement("img");
    const totalItems = document.createElement("p");
    const incrementButton = document.createElement("button");
    const incrementImage = document.createElement("img");

    element.classList.add("incrAndDecr", "flex", "flex-row", "justify-between", "space-x-10", "items-center", "rounded-full", "py-3", "px-3", "absolute", "left-1/2", "-translate-1/2", "bg-red");
    decrementButton.classList.add("decrement", "border", "border-rose50", "flex", "justify-center", "items-center", "rounded-full", "w-4", "h-4","hover:cursor-pointer");
    decrementImage.setAttribute("src", IMAGES.decrement)
    totalItems.classList.add("item-count", "text-rose50", "font-[600]");
    totalItems.innerText = "1";
    incrementButton.classList.add("increment", "border", "border-rose50", "flex", "justify-center", "items-center", "rounded-full", "w-4", "h-4","hover:cursor-pointer");
    incrementImage.setAttribute("src", IMAGES.increment);

    decrementButton.appendChild(decrementImage);
    incrementButton.appendChild(incrementImage);
    element.appendChild(decrementButton);
    element.appendChild(totalItems);
    element.appendChild(incrementButton);
    cartParent.appendChild(element);

}

function createCartDetails() {
    const cartDetails = document.createElement("div");
    const cartItems = document.createElement("div");
    const cartPrice = document.createElement("div");
    const orderTotal = document.createElement("p");
    const cartAmount = document.createElement("p");
    const number = document.createElement("span");
    const deliveryType = document.createElement("div");
    const tree = document.createElement("img");
    const text = document.createElement("div");
    const startText = document.createElement("p");
    const important = document.createElement("span");
    const endText = document.createElement("p");
    const confirmOrderButton = document.createElement("button");

    cartDetails.id = "cartDetails";
    cartDetails.classList.add("flex", "flex-col", "space-y-8");
    cartItems.id = "cartItems";
    cartItems.classList.add("flex", "flex-col", "space-y-6");
    cartPrice.classList.add("flex", "flex-row", "justify-between", "items-center");
    orderTotal.classList.add("text-rose500", "font-[400]");
    orderTotal.innerText = "Order Total"
    cartAmount.classList.add("text-rose900", "text-2xl", "font-[700]");
    cartAmount.innerText = "$";
    number.id = "orderTotalAmount";
    deliveryType.classList.add("bg-rose100", "rounded-xl", "flex", "flex-row", "justify-center", "items-center", "space-x-2", "py-3");
    tree.setAttribute("src", IMAGES.carbonNeutral);
    text.classList.add("text-rose500", "font-[400]", "flex", "flex-row", "space-x-2");
    important.classList.add("text-rose900", "font-[600]");
    startText.innerText = "This is a";
    important.innerText = "carbon-neutral";
    endText.innerText = "delivery";
    confirmOrderButton.id = "confirmOrder"
    confirmOrderButton.classList.add("rounded-full", "flex", "justify-center", "items-center", "bg-red", "text-rose100", "text-xl", "font-[600]", "py-3","hover:cursor-pointer");
    confirmOrderButton.innerText = "Confirm Order";

    cartPrice.appendChild(orderTotal);
    cartAmount.appendChild(number);
    cartPrice.appendChild(cartAmount);
    deliveryType.appendChild(tree);
    text.appendChild(startText);
    text.appendChild(important);
    text.appendChild(endText);
    deliveryType.appendChild(text);
    cartDetails.appendChild(cartItems);
    cartDetails.appendChild(cartPrice);
    cartDetails.appendChild(deliveryType);
    cartDetails.appendChild(confirmOrderButton);
    cartBox.appendChild(cartDetails);
}

function updateCartDetails(){
    addItems(data);
    itemsAndCost();
}

function addItems(data) {
    const cartItems = cartBox.querySelector("#cartItems");
    cartItems.innerHTML = "";
    data.forEach(item => {
        const element = document.createElement("div");
        const itemDetails = document.createElement("div");
        const itemName = document.createElement("p");
        const priceDetails = document.createElement("div");
        const noOfItems = document.createElement("p");
        const count = document.createElement("span");
        const priceOfItem = document.createElement("p");
        const totalPrice = document.createElement("p");
        const remove = document.createElement("button");
        const removeImage = document.createElement("img");
        const lineBreak = document.createElement("hr");

        element.classList.add("item", "flex", "flex-row", "justify-between", "items-center");
        itemDetails.classList.add("flex", "flex-col", "space-y-2");
        itemName.classList.add("cart-item-name", "text-rose900", "font-[600]");
        itemName.innerText = item.name;
        priceDetails.classList.add("flex", "flex-row", "space-x-2");
        noOfItems.classList.add("text-red", "font-[600]", "flex", "flex-row-reverse");
        noOfItems.innerText = "X";
        count.innerText = item.count;
        priceOfItem.classList.add("text-rose400");
        priceOfItem.innerText = `@$${(item.price).toFixed(2)}`;
        totalPrice.classList.add("total", "text-rose400", "font-[600]");
        totalPrice.innerText = `$${(item.count * item.price).toFixed(2)}`;
        remove.classList.add("remove", "border", "border-rose500", "rounded-full", "w-5", "h-5", "flex", "justify-center", "items-center", "hover:cursor-pointer");
        removeImage.setAttribute("src", IMAGES.removeItem);
        lineBreak.classList.add("border-t-rose100");

        noOfItems.appendChild(count);
        priceDetails.appendChild(noOfItems);
        priceDetails.appendChild(priceOfItem);
        priceDetails.appendChild(totalPrice);
        itemDetails.appendChild(itemName);
        itemDetails.appendChild(priceDetails);
        remove.appendChild(removeImage);
        element.appendChild(itemDetails);
        element.appendChild(remove);
        cartItems.appendChild(element);
        cartItems.appendChild(lineBreak);
    })
}

function itemsAndCost() {
    const totalItems = cartBox.querySelector("#cart-count");
    totalItems.innerText = data.reduce((noOfItems, item) => {
        noOfItems += item.count;
        return noOfItems;
    }, 0);
    const totalPrice = cartBox.querySelector("#orderTotalAmount");
    totalPrice.innerText = data.reduce((sum, item) => {
        sum += item.count * item.price;
        return sum;
    }, 0).toFixed(2);
}

function increaseAndDecreaseItems(e) {
    const increment = e.target.closest(".increment");
    const decrement = e.target.closest(".decrement");
    const item = e.target.closest(".dessert");
    const noOfItems = item.querySelector(".item-count");
    const getItem = findItem(item.querySelector(".name").innerText);

    if (increment) {
        if (getItem) {
            const index = data.indexOf(getItem);
            data[index].count += 1;
            noOfItems.innerText = data[index].count;
            updateCartDetails();
        }
    }

    else if (decrement) {
        if (getItem) {
            const index = data.indexOf(getItem);
            data[index].count -= 1;
            noOfItems.innerText = data[index].count;
            if (data[index].count == 0) {
                hideStylesOnItem(item);
                data.splice(index, 1);
                updateCartDetails();
            }
            if (data.length == 0) {
                showEmptyCart();
            }
        }
    }
}

function findItem(itemName) {
    return data.find(element => {
        return element.name == itemName;
    });
}

function hideStylesOnItem(element){
    element.querySelector(".cart").classList.remove("hidden");
    element.querySelector(".incrAndDecr").remove();
    element.querySelectorAll(".image").forEach(image => {
        image.classList.remove("border-red", "border-2");
    });
}

function showEmptyCart(){
    cartBox.querySelector("#cartDetails").remove();
    cartBox.querySelector("#emptyCart").classList.remove("hidden");
}

function removeItemFromCart(e) {
    const element = e.target;
    const removeButton = element.closest(".remove")
    if (removeButton) {
        let item = removeButton.closest(".item");
        const getItem=findItem(item.querySelector(".cart-item-name").innerText);
        removeItem(getItem);
    }
}

function removeItem(item) {
    items.querySelectorAll(".dessert").forEach(element => {
        if (item.name == element.querySelector(".name").innerText) {
            const index = data.indexOf(item);
            hideStylesOnItem(element);
            data.splice(index, 1);
            updateCartDetails();
        }
    });
    if(data.length==0){
        showEmptyCart();
    }
}

function confirmOrder(e) {
    const element = e.target;
    if (element.id == "confirmOrder") {
        if(document.querySelector(".newOrder")) return;
        console.log("order successfull");
        createOrderConfirmed();
        const newOrder = document.querySelector(".newOrder");
        newOrder.addEventListener("click", newOrderCreate);
    }
}

function createOrderConfirmed() {
    const overlay = document.createElement("div");
    const orderDetails = document.createElement("div");
    const orderConfirmedIcon = document.createElement("img");
    const orderStatusDetails = document.createElement("div");
    const status = document.createElement("h1");
    const message = document.createElement("p");
    const orderItems = document.createElement("div");
    const orderTotal = document.createElement("div");
    const text = document.createElement("h2");
    const amount = document.createElement("p");
    const newOrder = document.createElement("button");

    overlay.classList.add("overlay", "fixed", "inset-0", "bg-overlay", "z-40", "flex", "items-end", "md:items-center", "justify-center","h-screen");
    orderDetails.classList.add("flex", "flex-col", "space-y-8", "px-6", "py-10", "bg-white", "rounded-2xl","max-h-[90%]");
    orderConfirmedIcon.classList.add("self-start");
    orderConfirmedIcon.setAttribute("src", IMAGES.orderConfirmed);
    status.classList.add("text-rose900", "text-5xl", "font-[700]", "mb-2");
    status.innerText = "Order Confirmed";
    message.classList.add("text-rose500", "font-[400]");
    message.innerText = "We hope you enjoy your food";
    orderItems.classList.add("flex", "flex-col", "space-y-4", "bg-rose100", "px-6", "py-8", "rounded-xl","overflow-y-auto","max-h-[50%]");
    orderTotal.classList.add("flex", "flex-row", "justify-between");
    text.classList.add("text-rose500", "font-[400]");
    text.innerText = "Order Total";
    amount.classList.add("text-rose900", "text-2xl", "font-[700]");
    amount.innerText = `$${data.reduce((sum, item) => {
        sum += item.count * item.price;
        return sum;
    }, 0).toFixed(2)}`;
    newOrder.classList.add("newOrder","bg-red", "py-3", "flex", "justify-center", "items-center", "text-rose100", "font-[600]", "rounded-full", "hover:cursor-pointer");
    newOrder.innerText = "Start New Order";

    orderDetails.appendChild(orderConfirmedIcon);
    orderStatusDetails.appendChild(status);
    orderStatusDetails.appendChild(message);
    orderDetails.appendChild(orderStatusDetails);
    data.forEach(item => {
        addOrderItem(orderItems, item);
    });
    orderTotal.appendChild(text);
    orderTotal.appendChild(amount);
    orderItems.appendChild(orderTotal);
    orderDetails.appendChild(orderItems);
    orderDetails.appendChild(newOrder);
    overlay.appendChild(orderDetails);
    document.body.appendChild(overlay);
    document.documentElement.classList.add("overflow-hidden");
}

function addOrderItem(layout, item) {
    const orderItem = document.createElement("div");
    const orderData = document.createElement("div");
    const itemImage = document.createElement("img");
    const itemInfo = document.createElement("div");
    const itemName = document.createElement("p");
    const itemPriceDetails = document.createElement("div");
    const noOfItems = document.createElement("p");
    const cost = document.createElement("p");
    const orderTotalCost = document.createElement("p");
    const lineBreak = document.createElement("hr");

    orderItem.classList.add("flex", "flex-row", "justify-between", "items-center");
    orderData.classList.add("flex", "flex-row", "space-x-2", "items-stretch");
    itemImage.classList.add("w-15", "h-15", "rounded-xl");
    itemImage.setAttribute("src", item.thumbnail);
    itemInfo.classList.add("flex", "flex-col", "space-y-2");
    itemName.classList.add("text-rose900", "font-[600]", "text-ellipsis");
    itemName.innerText = item.name;
    itemPriceDetails.classList.add("flex", "flex-row", "space-x-2");
    noOfItems.classList.add("text-red", "font-[600]");
    noOfItems.innerText = `${item.count}x`;
    cost.classList.add("text-rose500", "font-[400]");
    cost.innerText = `@$${(item.price).toFixed(2)}`;
    orderTotalCost.classList.add("text-rose500", "font-[600]", "text-xl");
    orderTotalCost.innerText = `$${(item.count * item.price).toFixed(2)}`;
    lineBreak.classList.add("border-t-rose300");

    orderData.appendChild(itemImage);
    itemInfo.appendChild(itemName);
    itemPriceDetails.appendChild(noOfItems);
    itemPriceDetails.appendChild(cost);
    itemInfo.appendChild(itemPriceDetails);
    orderData.appendChild(itemInfo);
    orderItem.appendChild(orderData);
    orderItem.appendChild(orderTotalCost);
    layout.appendChild(orderItem);
    layout.appendChild(lineBreak);
}

function newOrderCreate() {
    console.log("newOrder");
    document.documentElement.classList.remove("overflow-hidden");
    const overlay = document.querySelector(".overlay");
    overlay.remove();
    cartBox.querySelectorAll(".item").forEach(element => {
        const item=findItem(element.querySelector(".cart-item-name").innerText);
        removeItem(item);
    })
}