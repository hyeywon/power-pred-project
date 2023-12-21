package powerplant.powerpred.account;

import java.util.HashMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class AccountController {

    private final AccountService accountService;

    @PostMapping("/sign-up")
    public ResponseEntity<Account> signUp(@RequestBody Account account) {
        log.info("SIGN UP: " + account.toString());
        if (accountService.signUp(account).equals(account.getId())) {
            return ResponseEntity.ok(account);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(account);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<Account> signIn(@RequestBody HashMap<Object, Object> acc) {
        Account account = accountService.checkAdmin((String) acc.get("id"), (String) acc.get("pw"));
        log.info("SIGN IN: " + account.toString());

        if (accountService.signIn(account).getId().equals(account.getId())) {
            return ResponseEntity.ok(account);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(account);
    }

    @PostMapping("/sign-out")
    public ResponseEntity<Void> signOut() {
        log.info("Sign out");
        return ResponseEntity.ok().build();
    }
}
