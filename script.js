$(document).ready(function() {
  let deliveryFee = 0;

  // 從 SessionStorage 讀取並更新購物車顯示
  function loadCartItems() {
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    $('#checkout-items').empty(); // 清空結帳頁面的品項列表
    cartItems.forEach(item => {
      $('#checkout-items').append(`
        <li class="cart-item" data-name="${item.name}" data-price="${item.price}">
          <span>${item.name} - NT$${item.price}</span>
        </li>
      `);
    });
    updateTotalPrice();
  }

  // 更新總金額，根據外送選項加上外送費用
  function updateTotalPrice() {
    let totalPrice = 0;
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    cartItems.forEach(item => {
      totalPrice += item.price;
    });
    $('#checkout-total').text(`總金額: NT$${totalPrice + deliveryFee}`);
  }

  // 切換外送/自取時更新運費
  $('input[name="delivery"]').on('change', function() {
    deliveryFee = $(this).val() === 'delivery' ? 30 : 0;
    updateTotalPrice();
  });

  // 前往結帳頁面
  $('#checkout-btn').on('click', function() {
    window.location.href = 'checkout.html';
  });

  // 確認結帳
  $('#confirm-checkout').on('click', function() {
    alert('結帳成功！感謝您的購買！');
    sessionStorage.removeItem('cartItems'); // 清空購物車
    window.location.href = 'index.html'; // 回到主頁
  });

  // 新增至購物車按鈕事件
  $('.add-to-cart').on('click', function() {
    const itemName = $(this).closest('.menu-item').data('name');
    const itemPrice = $(this).closest('.menu-item').data('price');
    
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    cartItems.push({ name: itemName, price: itemPrice });
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems)); // 儲存到 SessionStorage

    showPopup(`${itemName} 已加入購物車！`);
  });

  // 初始化結帳頁面時，載入購物車內容
  if (window.location.pathname.includes('checkout.html')) {
    loadCartItems();
  }
});

