<template>
  <div>
    <beautiful-chat
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :showEmoji="true"
      :showFile="false"
      :showTypingIndicator="showTypingIndicator"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling" />
  </div>
</template>

<script>
export default {
  name: 'Chat',
  data() {
    return {
      participants: [],
      titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      messageList: [],
      userName: "",
      newMessagesCount: 0,
      isChatOpen: false,
      showTypingIndicator: '',
      colors: {
        header: {
          bg: '#00bb8b',
          text: '#ffffff'
        },
        launcher: {
          bg: '#00bb8b'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#00bb8b',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      },
      alwaysScrollToBottom: false,
      messageStyling: true
    }
  },
  sockets: {
    chatUsers: function(data){
      this.participants = JSON.parse(data);
      this.$socket.emit('allParticipants', this.participants);
    },
    meNameChat:function(data){
      this.userName = data;
    },
    initialMessages: function(data){
      this.messageList = JSON.parse(data);
    },
    actMessagesList: function(data){
      this.messageList = JSON.parse(data);
    }
  },
  methods: {
    sendMessage (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({ author: this.userName, type: 'text', data: { text } });
      }
    },
    onMessageWasSent (message) {
      // called when the user sends a message
      this.messageList = [ ...this.messageList, message ];
      this.$socket.emit('newMessage',JSON.stringify(this.messageList));
    },
    openChat () {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    }
  }
}
</script>
