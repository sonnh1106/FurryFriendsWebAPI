package com.system.backend.Controller;


import com.system.backend.Dto.LoginDTO;
import com.system.backend.Dto.UserDTO;
import com.system.backend.Service.UserService;
import com.system.backend.payload.response.LoginMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("api/v1/user")
public class UserController {
    @Autowired
    private UserService userService;
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Integer id) {
        String message = userService.deleteUser(id);
        return message;
    }



}
