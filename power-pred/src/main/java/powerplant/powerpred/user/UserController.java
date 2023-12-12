package powerplant.powerpred.user;

import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/join-request")    //todo
    public String joinRequest(@RequestParam("id") String id, @RequestParam("pw") String pw,
                              @RequestParam("isAdmin") boolean isAdmin, Model model) {

    }

    @PostMapping("/sign-in")    //todo
    public String signIn() {

    }

    @GetMapping("/sign-out")    //todo
    public String signOut() {

    }
}
