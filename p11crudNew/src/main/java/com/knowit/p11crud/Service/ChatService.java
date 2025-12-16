package com.knowit.p11crud.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowit.p11crud.Entity.Chat;
import com.knowit.p11crud.Entity.Message;
import com.knowit.p11crud.Entity.Property;
import com.knowit.p11crud.Entity.User;
import com.knowit.p11crud.Repository.ChatRepository;
import com.knowit.p11crud.Repository.MessageRepository;
import com.knowit.p11crud.Repository.PropertyRepository; // Assuming this exists
import com.knowit.p11crud.Repository.UserRepository; // Assuming this exists

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    public Chat createChat(int tenantId, int landlordId, int propertyId) {
        User tenant = userRepository.findById(tenantId).orElseThrow(() -> new RuntimeException("Tenant not found"));
        User landlord = userRepository.findById(landlordId)
                .orElseThrow(() -> new RuntimeException("Landlord not found"));
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        if (chatRepository.existsByTenantAndLandlordAndProperty(tenant, landlord, property)) {
            throw new RuntimeException("Chat already exists");
        }

        Chat chat = new Chat();
        chat.setTenant(tenant);
        chat.setLandlord(landlord);
        chat.setProperty(property);
        return chatRepository.save(chat);
    }

    public List<Chat> getChatsForUser(int userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return chatRepository.findByTenantOrLandlord(user, user);
    }

    public Message sendMessage(int chatId, int senderId, String content) {
        Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new RuntimeException("Chat not found"));
        User sender = userRepository.findById(senderId).orElseThrow(() -> new RuntimeException("User not found"));

        Message message = new Message();
        message.setChat(chat);
        message.setSender(sender);
        message.setContent(content);
        return messageRepository.save(message);
    }

    public List<Message> getMessages(int chatId) {
        Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new RuntimeException("Chat not found"));
        return messageRepository.findByChatOrderByTimestampAsc(chat);
    }
}
