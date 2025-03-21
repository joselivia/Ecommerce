import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';  
import React, { useState } from 'react'; 
export default function CustomerServiceScreen(){ 
  const [messages, setMessages] = useState([ 
    { role: 'assistant', content: 'Hello, good morning. I am a Customer Service, is there anything I can help you with?' }, 
  ]); 
 
  const handleSendMessage = (message:string) => { 
    setMessages([...messages, { role: 'user', content: message }]); 
    setTimeout(() => { 
      setMessages([...messages, { role: 'assistant', content: 'Of course... Can you tell me the problem you are having? so I can help solve it' }]); 
    }, 500); 
  }; 
 
  return ( 
    <View style={styles.container}> 
      <View style={styles.header}> 
        <TouchableOpacity style={styles.backButton}> 
          <Ionicons name="arrow-back" size={24} color="black" /> 
        </TouchableOpacity> 
        <Text style={styles.headerTitle}>Customer Service</Text> 
        <TouchableOpacity style={styles.callButton}> 
          <Ionicons name="call" size={24} color="black" /> 
        </TouchableOpacity> 
      </View> 
      <ScrollView style={styles.chatContainer}> 
        {messages.map((message, index) => ( 
          <View key={index} style={message.role === 'assistant' ? styles.assistantMessage : styles.userMessage}> 
            <Text style={styles.messageText}>{message.content}</Text> 
          </View> 
        ))} 
      </ScrollView> 
      <View style={styles.inputContainer}> 
        <TextInput 
          style={styles.input} 
          placeholder="Write your message..." 
          multiline 
          onChangeText={(text) => {}} // Handle text input here 
        /> 
        <TouchableOpacity style={styles.sendButton}> 
          <Ionicons name="send" size={24} color="black" /> 
        </TouchableOpacity> 
      </View> 
    </View> 
  ); 
}; 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
  }, 
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
  }, 
  backButton: { 
    marginLeft: -10, 
  }, 
  headerTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
  }, 
  callButton: { 
    marginRight: -10, 
  }, 
   
  chatContainer: { 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
  }, 
  assistantMessage: { 
    backgroundColor: '#f0f0f0', 
    padding: 10, 
    borderRadius: 10, 
    marginBottom: 10, 
    maxWidth: '70%', 
    alignSelf: 'flex-start', 
  }, 
  userMessage: { 
    backgroundColor: '#007aff', 
    padding: 10, 
    borderRadius: 10, 
    marginBottom: 10, 
    maxWidth: '70%', 
    alignSelf: 'flex-end', 
  }, 
  messageText: { 
    color: '#fff', 
  }, 
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderTopWidth: 1, 
    borderTopColor: '#ccc', 
  }, 
  input: { 
    flex: 1, 
    marginRight: 10, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5, 
    padding: 10, 
  }, 
  sendButton: { 
    backgroundColor: '#007aff', 
    borderRadius: 5, 
    padding: 10, 
  }, 
}); 
 