package com.knowit.p11_Gateway;
import java.util.Arrays;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class MyBeans {
		//http://localhost:8080/api1/welcome   --  localhost:8081
		 //http://localhost:8080/api1/welcome   -- localhost:8082
		
		@Bean
		public RouteLocator customRouterLocator(RouteLocatorBuilder builder) {
			return builder.routes() 
					.route("REGISTRATIONAPI", r -> r.path("/auth/**")
						 .uri("lb://REGISTRATIONAPI"))
					.route("P11CRUD", r -> r.path("/crud/**")
						 .uri("lb://P11CRUD"))
						 //.uri("http://localhost:8110"))
						 				
					.route("TRASACTION", r -> r.path("/TenantProperty/**")
						 .uri("http://localhost:9114"))
					
					.build();
		}
		
		@Bean
	    public CorsWebFilter corsWebFilter() {
	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        CorsConfiguration config = new CorsConfiguration();
	         
	        config.setAllowCredentials(true);
	        config.setAllowedOrigins(Arrays.asList("http://localhost:3011")); // Frontend URL
	        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE","OPTIONS"));
	        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
	         
	        source.registerCorsConfiguration("/**", config);
	        return new CorsWebFilter(source);
	    }
}
