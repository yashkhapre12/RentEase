package com.knowit.p11crud.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.knowit.p11crud.Entity.Chat;
import com.knowit.p11crud.Entity.Property;
import com.knowit.p11crud.Entity.User;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {
    List<Chat> findByTenant(User tenant);

    List<Chat> findByLandlord(User landlord);

    List<Chat> findByTenantOrLandlord(User tenant, User landlord);

    boolean existsByTenantAndLandlordAndProperty(User tenant, User landlord, Property property);
}
