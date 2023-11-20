// index.js

// pages/index/index.js
Page({
  data: {
    messages: [],
    inputContent: '', 
    inputBottom: 0,
    toViewId: '',
    inputFocus: false, // if input is focused
  },

  // onload is called when the page is loaded
  onLoad: function() {
    const that = this;
    wx.onKeyboardHeightChange(function(res) {
      if (res.height !== undefined) {
        const height = res.height;
        if (height > 0) {
          that.setData({
            inputBottom: height // keyboard height
          });
        } else {
          that.setData({
            inputBottom: 0 // reset keyboard height
          });
        }
      }
    });
  },

  onUnload: function() {
    wx.offKeyboardHeightChange(this.onKeyboardHeightChange);
  },

  // calls when the input is focused
  onInput: function(e) {
    this.setData({
      inputContent: e.detail.value // update input content
    });
  },

  // calls when the user clicks the send button
  sendMessage: function() {
    const userMessage = this.data.inputContent.trim();

    // adds the user's message to the chat log
    if (userMessage) {
      this.addMessage('user', userMessage);

      // gets the reply from the server
      this.getReplyFromServer(userMessage);

      // refucus the input
      this.setData({ 
        inputFocus: true 
      });

      // clear input content
      this.setData({
        inputContent: ''
      });
    }
  },

  // gets the reply from the server
  getReplyFromServer: function(message) {
    const that = this;
    wx.request({
      url: 'http://localhost:3000/get-reply', // server url
      method: 'POST',
      data: {
        message: message
      },
      success: function(res) {
        // adds the bot reply to the chat log
        if (res.data && res.data.reply) {
          that.addMessage('bot', res.data.reply);
        }
      },
      fail: function(err) {
        console.error("Failed to connect to server：", err);
        that.addMessage('bot', 'Sorry, not now.');
      }
    });
  },

  // adds a message to the chat log
  addMessage: function(sender, content) {
    const newMessage = { sender: sender, content: content };
    const updatedMessages = [...this.data.messages, newMessage];
    this.setData({
      messages: updatedMessages,
      toViewId: `msg-${updatedMessages.length - 1}` // scroll to the latest message
    });
  }
});


