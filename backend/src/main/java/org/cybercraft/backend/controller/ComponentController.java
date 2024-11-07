package org.cybercraft.backend.controller;

import org.cybercraft.backend.service.ComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class ComponentController {

    @Autowired
    private ComponentService componentService;

    @GetMapping("/api/components")
    public Map<String, Object> getComponents() {
        return componentService.getAllComponents();
    }
}