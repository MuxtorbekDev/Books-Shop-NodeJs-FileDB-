const toCurrency = (price) => {
  return new Intl.NumberFormat("us-US", {
    currency: "USD",
    style: "currency",
  }).format(price);
};

document.querySelectorAll(".price").forEach((m) => {
  m.textContent = toCurrency(m.textContent);
});

const $card = document.querySelector("#card");
if ($card) {
  $card.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-remove")) {
      const id = e.target.dataset.id;
      fetch("/card/remove/" + id, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((card) => {
          if (card.books.length) {
            const dynamicHTML = card.books
              .map((c) => {
                return `
              <tr>
              <td>${c.title}</td>
              <td>${c.count}</td>
              <td>
                <button class="btn btn-small red js-remove" data-id="${c.id}">Delete</button>
              </td>
            </tr>
              `;
              })
              .join("");
            $card.querySelector("tbody").innerHTML = dynamicHTML;
            $card.querySelector(".price").textContent = toCurrency(card.price);
          } else {
            $card.innerHTML = `
            <div class="row">
				 
					<div class="col-md-12">
					
							<div class="card1">
						<div class="card-header">
						<h5>Cart</h5>
						</div>
						<div class="card-body cart">
								<div class="col-sm-12 empty-cart-cls text-center">
									<img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" class="img-fluid mb-4 mr-3">
									<h3><strong>Your Cart is Empty</strong></h3>
									<h4>Add something to make me happy :)</h4>
									<a href="/notebooks" class="btn btn-primary cart-btn-transform m-3" data-abc="true">continue shopping</a>
									
								
								</div>
						</div>
				</div>
						
					
					</div>
				 
				 </div>
            `;
          }
        });
    }
  });
}
