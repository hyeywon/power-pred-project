package powerplant.powerpred.account;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final HttpSession session;

    /**
     * 회원가입
     */
    public String signUp(Account account) {
        try {
            validateRedundantId(account);
        } catch (IllegalStateException e) {
            return "";
        }
        accountRepository.save(account);
        return account.getId();
    }

    private void validateRedundantId(Account account) {
        accountRepository.findById(account.getId())
                .ifPresent(a -> {
                    throw new IllegalStateException("이미 존재하는 아이디입니다.");
                });
    }

    /**
     * 로그인
     */
    public Account checkAdmin(String id, String pw) {
        boolean isAdmin = accountRepository.findById(id).get().getIsAdmin();
        return new Account(id, pw, isAdmin);
    }

    public String signIn(Account account) {
        try {
            validateAccount(account);
        } catch (IllegalStateException e) {
            return "";
        }
        session.setAttribute("id", account.getId());
        session.setAttribute("isAdmin", account.getIsAdmin());
        return account.getId();
    }

    private void validateAccount(Account account) {
        accountRepository.findById(account.getId())
                .ifPresentOrElse(
                        a -> {
                            checkPw(account);
                        },
                        () -> {
                            throw new IllegalStateException("존재하지 않는 아이디입니다.");
                        }
                );
    }

    private void checkPw(Account account) {
        accountRepository.findById(account.getId())
                .filter(acc -> acc.getPw().equals(account.getPw()))
                .ifPresentOrElse(
                        a -> {},
                        () -> {
                            throw new IllegalStateException("비밀번호가 일치하지 않습니다.");
                        }
                        );
    }

    /**
     * 로그아웃
     */
    public void signOut() {
        session.invalidate();
    }
}
