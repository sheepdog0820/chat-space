$(function(){ 

  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="message">
          <div class="upper-message">
            <p class="message__upper-info__talker">
              ${message.user_name}
            </p>
            <p class="message__upper-info__date">
              ${message.created_at}
            </p>
          </div>
          <p class="message__text">
            ${message.content}
          </p>
          <img src=${message.image}>
        </div>`
      return html;
    } else {
      var html =
      `<div class="message">
        <div class="upper-message">
          <p class="message__upper-info__talker">
            ${message.user_name}
          </p>
          <p class="message__upper-info__date">
            ${message.created_at}
          </p>
        </div>
        <p class="message__text">
          ${message.content}
        </p>
      </div>`
      return html;
    };
  }

  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = `<div class="message">
                    <div class="upper-message">
                      <p class="message__upper-info__talker">
                        ${message.user_name}
                      </p>
                      <p class="message__upper-info__date">
                        ${message.created_at}
                      </p>
                    </div>
                    <p class="message__text">
                      ${message.content}
                    </p>
                    <img src=${message.image}>
                  </div>`
    } else if (message.content) {
      var html = `<div class="message">
                    <div class="upper-message">
                      <p class="message__upper-info__talker">
                        ${message.user_name}
                      </p>
                      <p class="message__upper-info__date">
                        ${message.created_at}
                      </p>
                    </div>
                    <p class="message__text">
                      ${message.content}
                    </p>
                  </div>`
    } else if (message.image) {
      var html = `<div class="message">
                    <div class="upper-message">
                      <p class="message__upper-info__talker">
                        ${message.user_name}
                      </p>
                      <p class="message__upper-info__date">
                        ${message.created_at}
                      </p>
                    </div>
                    <img src=${message.image}>
                  </div>`
    };
    return html;
  };

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.lenght !== 0){
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-bar__messages').append(insertHTML);
        $('.main-bar__messages').animate({ scrollTop: $('.main-bar__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $(".main-bar__messages").append(html);
      $('.main-bar__messages').animate({ scrollTop: $('.main-bar__messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.main-bar__message-form__form__send').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});