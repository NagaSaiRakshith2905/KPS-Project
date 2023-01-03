package com.capgemini.kpsbackend.service;

import com.capgemini.kpsbackend.dto.request.NetworkRequest;
import com.capgemini.kpsbackend.dto.request.NetworkUpdateRequest;
import com.capgemini.kpsbackend.entities.Network;
import com.capgemini.kpsbackend.entities.circuit.Circuit;

import java.util.List;

public interface NetworkService {
    Network add(NetworkRequest networkRequest);
    List<Network> getAll();
    Network getById(int id);
    Network update(NetworkUpdateRequest networkUpdateRequest);
    void deleteById(int id);

    List<Network> getAllNetworkForUser(String username);
    List<Circuit> analysePath(String src, String dst, Integer networkId, String udf);
}
