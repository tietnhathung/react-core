package com.react.api.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@EnableWebMvc
@Configuration
public class WebMvcConfig implements WebMvcConfigurer  {
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        Hibernate5Module module = new Hibernate5Module();

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(module);

        converters.add(new MappingJackson2HttpMessageConverter(mapper));
    }
}
