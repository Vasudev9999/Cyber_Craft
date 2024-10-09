package org.cybercraft.backend.repository;

import org.cybercraft.backend.entity.Cabinet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CabinetRepository extends JpaRepository<Cabinet, Long> {
}
