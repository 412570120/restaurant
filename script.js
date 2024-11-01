$(document).ready(function() {
  let deliveryFee = 0;

  // 顯示彈窗的函數，加入滑動效果
  function showPopup(message) {
    $('#popup-text').text(message);
    $('#popup-message').slideDown(300).delay(1000).slideUp(300); // 滑入和滑出
  }

  $('header h1').slideDown(1000); // 1秒滑入
  $('header h2').each(function(index) {
    $(this).delay(1000 + index * 500).slideDown(1000); // 每個副標題依序滑入
  });

  $('#menu-btn').on('click', function() {
    $('.content-section').slideUp(300); // 隱藏其他內容
    $('#menu').delay(300).slideDown(500); // 滑動顯示魔藥鋪內容
  });

  $('#cart-btn').on('click', function() {
    $('.content-section').slideUp(300);
    $('#cart').delay(300).slideDown(500); // 滑動顯示購物籃
  });

  // 更新總金額，根據外送選項加上外送費用
  function updateTotalPrice() {
    let totalPrice = 0;
    $('#cart-items .cart-item').each(function() {
      const itemPrice = $(this).data('price');
      totalPrice += itemPrice;
    });

    $('#total-price').text(`總金額: NT$${totalPrice}`);
    $('#checkout-total').text(`總金額: NT$${totalPrice + deliveryFee}`);
  }

  // 更新sessionStorage的購物車內容
  function updateSessionStorage() {
    const cartItems = [];
    $('#cart-items .cart-item').each(function() {
      const itemName = $(this).data('name');
      const itemPrice = $(this).data('price');
      cartItems.push({ name: itemName, price: itemPrice });
    });
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  // 載入sessionStorage的購物車內容到頁面
  function loadCartItems() {
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    $('#cart-items').empty();
    cartItems.forEach(item => {
      $('#cart-items').append(`
        <li class="cart-item" data-name="${item.name}" data-price="${item.price}">
          <span>${item.name} - NT$${item.price}</span>
          <button class="remove-item">刪除</button>
        </li>
      `).hide().slideDown(500); // 增加滑入動畫
    });
    updateTotalPrice();
  }

  // 切換外送/自取時更新運費
  $('input[name="delivery"]').on('change', function() {
    deliveryFee = $(this).val() === 'delivery' ? 30 : 0;
    updateTotalPrice();
  });

  // 顯示購物籃
  $('#menu-btn').on('click', function() {
    $('.content-section').fadeOut(200, function() {
      $('#menu').fadeIn(200);
    });
  });

  // 顯示購物籃
  $('#cart-btn').on('click', function() {
    $('.content-section').fadeOut(200, function() {
      $('#cart').fadeIn(200);
      updateTotalPrice(); // 更新顯示的總金額
    });
  });

  // 前往結帳
  $('#checkout-btn').on('click', function() {
    const cartItems = $('#cart-items .cart-item');

    // 檢查購物車是否為空
    if (cartItems.length === 0) {
      event.preventDefault();
      showPopup('購物籃是空的，請先餵它吃東西！'); // 顯示提示
      return; // 退出，不執行後續代碼
    }
    
    $('.content-section').fadeOut(200, function() {
      $('#checkout').fadeIn(400); // 增加漸入動畫
    });

    $('#checkout-btn').on('click', function(event) {
  if ($('#cart-items').children().length === 0) {
    event.preventDefault();
    showPopup('購物籃是空的，請先餵它吃東西！');
  } else {
    window.location.href = 'checkout.html';
  }
});


    // 複製購物籃內容到結帳頁面
    $('#checkout-items').empty(); // 清空結帳項目
    $('#cart-items .cart-item').each(function() {
      const itemName = $(this).data('name');
      const itemPrice = $(this).data('price');
      $('#checkout-items').append(`
        <li class="checkout-item" data-price="${itemPrice}">
          ${itemName} - NT$${itemPrice}
        </li>
      `).hide().fadeIn(500); // 加入漸入效果
    });

    updateTotalPrice();
  });

  // 確認結帳
  $('#confirm-checkout').on('click', function() {
    $('.content-section').fadeOut(200, function() {
      $('#order-complete').fadeIn(500);
    });

    setTimeout(function() {
      $('#order-complete').fadeOut(500, function() {
        $('#menu').fadeIn(500); // 返回主頁面
        $('#cart-items').empty();  // 清空購物車
        sessionStorage.removeItem('cartItems'); // 清空 sessionStorage
        updateTotalPrice(); // 更新為0元
      });
    }, 3000);
  });

  // 回到購物籃
  $('#back-to-cart').on('click', function() {
    $('.content-section').fadeOut(200, function() {
      $('#cart').fadeIn(200);
    });
  });

  // 新增至購物車按鈕事件，滑入效果
  $('.add-to-cart').on('click', function() {
    const itemName = $(this).closest('.menu-item').data('name');
    const itemPrice = $(this).closest('.menu-item').data('price');

    $('#cart-items').append(`
      <li class="cart-item" data-name="${itemName}" data-price="${itemPrice}">
        <span>${itemName} - NT$${itemPrice}</span>
        <button class="remove-item">刪除</button>
      </li>
    `).hide().slideDown(500); // 加入滑入動畫
    updateTotalPrice();
    updateSessionStorage(); // 更新 sessionStorage
    showPopup(`${itemName} 已新增購物籃！`);
  });

  // 刪除購物車內的單一商品，加入滑出效果
  $('#cart-items').on('click', '.remove-item', function() {
    $(this).closest('.cart-item').slideUp(500, function() {
      $(this).remove();
      updateTotalPrice();
      updateSessionStorage(); // 更新 sessionStorage
      showPopup('商品已從購物籃移除！');
    });
  });

  // 清空購物車按鈕事件，滑出效果
  $('#clear-cart').on('click', function() {
    $('#cart-items .cart-item').slideUp(500, function() {
      $(this).remove();
      updateTotalPrice();
      sessionStorage.removeItem('cartItems'); // 清空 sessionStorage
      showPopup('購物籃已清除記憶！');
    });
  });

  // 頁面加載時載入sessionStorage的購物車內容
  loadCartItems();
});
