package org.cybercraft.backend.repository;

import org.cybercraft.backend.entity.Processor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcessorRepository extends JpaRepository<Processor, Long> {
}
