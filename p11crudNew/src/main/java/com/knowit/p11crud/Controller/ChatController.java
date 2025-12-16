package com.knowit.p11crud.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.p11crud.Entity.Chat;
import com.knowit.p11crud.Entity.Message;
import com.knowit.p11crud.Service.ChatService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/chats")
    public Chat createChat(@RequestBody Map<String, Integer> payload) {
        int tenantId = payload.get("tenantId");
        int landlordId = payload.get("landlordId");
        int propertyId = payload.get("propertyId");
        return chatService.createChat(tenantId, landlordId, propertyId);
    }

    @GetMapping("/chats/user/{userId}")
    public List<Chat> getChatsForUser(@PathVariable int userId) {
        return chatService.getChatsForUser(userId);
    }

    @PostMapping("/messages")
    public Message sendMessage(@RequestBody Map<String, Object> payload) {
        int chatId = (int) payload.get("chatId");
        int senderId = (int) payload.get("senderId");
        String content = (String) payload.get("content");
        return chatService.sendMessage(chatId, senderId, content);
    }

    @GetMapping("/messages/{chatId}")
    public List<Message> getMessages(@PathVariable int chatId) {
        return chatService.getMessages(chatId);
    }
}
