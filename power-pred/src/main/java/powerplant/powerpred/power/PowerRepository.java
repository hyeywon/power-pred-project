package powerplant.powerpred.power;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PowerRepository extends JpaRepository<Power, PowerPK> {

    List<Power> findByBuildingID(Long buildingId);
}
