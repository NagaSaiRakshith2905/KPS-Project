package com.capgemini.kpsbackend.controller;

import com.capgemini.kpsbackend.dto.request.NetworkRequest;
import com.capgemini.kpsbackend.dto.request.NetworkUpdateRequest;
import com.capgemini.kpsbackend.entities.Network;
import com.capgemini.kpsbackend.entities.circuit.Circuit;
import com.capgemini.kpsbackend.service.NetworkService;
import com.capgemini.kpsbackend.service.NetworkServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/network/")
@CrossOrigin(origins = "*")
@Slf4j
public class NetworkController {
    @Autowired
    private NetworkService service;

    @PostMapping("add-network/")
    public Network addNetwork(@RequestBody NetworkRequest networkRequest){
        return service.add(networkRequest);
    }

    @GetMapping("get-all-networks/")
    public List<Network> getAllNetwork(){
        return service.getAll();
    }

    @GetMapping ("get-networks-by-id/")
    public Network getNetworkById(@RequestParam(value = "id") int id){
        return service.getById(id);
    }
    @GetMapping("get-all-networks-for-user/")
    public List<Network> getAllNetworkForUser(@RequestParam("username") String username)
    {
        return service.getAllNetworkForUser (username);
    }

    @PutMapping("update-network/")
    public ResponseEntity<Network> updateNetwork(@RequestBody NetworkUpdateRequest networkUpdateRequest){
        return new ResponseEntity<>(service.update(networkUpdateRequest), HttpStatus.OK);
    }

    @DeleteMapping("delete-network-by-id/")
    @ResponseStatus(HttpStatus.OK)
    public void deleteNetworkById(@RequestParam(value = "id") int id){
        service.deleteById(id);
    }

    @PostMapping("analyse/")
    @ResponseStatus(HttpStatus.OK)
    public void analyse(@RequestParam(value = "id") int id,@RequestParam(value = "udp") String  udp){
        service.analysePath(id,udp);
    }
}
