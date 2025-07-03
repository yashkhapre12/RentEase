package com.knowit.p11crud.Entity;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
	 @Bean
	    public WebMvcConfigurer corsConfigurer() {
	        return new WebMvcConfigurer() {
	            @Override
	            public void addCorsMappings(CorsRegistry registry) {
//	                registry.addMapping("/api/**") // ✅ Apply CORS to all API endpoints
//	                        .allowedOrigins("http://localhost:5173") // ✅ Allow frontend
//	                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // ✅ Allow these HTTP methods
//	                        .allowedHeaders("*"); // ✅ Allow all headers
	            	registry.addMapping("/**") // Allow all endpoints
                    .allowedOrigins("*") // Allow all origins (not recommended for production)
                    .allowedMethods("*") // Allow all HTTP methods
                    .allowedHeaders("*") // Allow all headers
                    .allowCredentials(false); // Disable credentials (if needed)
	            }
	        };
	    }
}
