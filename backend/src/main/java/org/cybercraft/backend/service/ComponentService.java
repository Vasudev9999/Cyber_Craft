package org.cybercraft.backend.service;

import org.cybercraft.backend.entity.*;
import org.cybercraft.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ComponentService {

    @Autowired
    private ProcessorRepository processorRepository;

    @Autowired
    private MotherboardRepository motherboardRepository;

    @Autowired
    private CabinetRepository cabinetRepository;

    @Autowired
    private CpuCoolerRepository cpuCoolerRepository;

    @Autowired
    private RamRepository ramRepository;

    @Autowired
    private GraphicsCardRepository graphicsCardRepository;

    @Autowired
    private SsdRepository ssdRepository;

    @Autowired
    private HddRepository hddRepository;

    @Autowired
    private PowerSupplyRepository powerSupplyRepository;

    @Autowired
    private CaseFanRepository caseFanRepository;

    @Autowired
    private ModCableRepository modCableRepository;

    public Map<String, Object> getAllComponents() {
        Map<String, Object> components = new HashMap<>();
        components.put("processors", processorRepository.findAll());
        components.put("motherboards", motherboardRepository.findAll());
        components.put("cabinets", cabinetRepository.findAll());
        components.put("cpuCoolers", cpuCoolerRepository.findAll());
        components.put("rams", ramRepository.findAll());
        components.put("graphicsCards", graphicsCardRepository.findAll());
        components.put("ssds", ssdRepository.findAll());
        components.put("hdds", hddRepository.findAll());
        components.put("powerSupplies", powerSupplyRepository.findAll());
        components.put("caseFans", caseFanRepository.findAll());
        components.put("modCables", modCableRepository.findAll());
        return components;
    }
}
