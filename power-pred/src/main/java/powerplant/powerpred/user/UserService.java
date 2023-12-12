package powerplant.powerpred.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    /**
     * 회원가입
     */
    public String join(User user) {
        validateRedundantId(user);
        userRepository.save(user);
        return user.getId();
    }

    public void validateRedundantId(User user) {
        userRepository.findById(user.getId())
                .ifPresent(u -> {
                    throw new IllegalStateException("이미 존재하는 아이디입니다.");
                });
    }

    /**
     * 로그인
     */
    public String signIn(User user) {

    }
}
