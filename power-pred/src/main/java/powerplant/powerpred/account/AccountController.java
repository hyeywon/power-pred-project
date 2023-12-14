package powerplant.powerpred.account;

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

    @PostMapping("/signUp")
    public ResponseEntity<Account> signUp(@RequestBody Account account) {

        log.info("account: " + account);
        if (accountService.signUp(account).equals(account.getId())) {
            return ResponseEntity.ok(account);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(account);
    }

    @PostMapping("/signIn")
    public ResponseEntity<Account> signIn(@RequestBody Account account) {
        if (accountService.signIn(account).equals(account.getId())) {
            return ResponseEntity.ok(account);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(account);
    }

    @PostMapping("/signOut")
    public ResponseEntity<Void> signOut() {
        accountService.signOut();
        return ResponseEntity.ok().build();
    }
}