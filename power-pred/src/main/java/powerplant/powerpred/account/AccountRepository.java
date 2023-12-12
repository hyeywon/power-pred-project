package powerplant.powerpred.account;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, String> {

    public Optional<Account> findById(String id);

}
