package com.capgemini.kpsbackend.exception;

public class NetworkNotFoundException extends RuntimeException{
    public NetworkNotFoundException(String message) {
        super(message);
    }
}
