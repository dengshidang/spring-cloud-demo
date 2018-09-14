package com.foreye.register.center;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class ForeyeCenterApp {
	public static void main(String[] args) {
		SpringApplication.run(ForeyeCenterApp.class, args);

	}
}
