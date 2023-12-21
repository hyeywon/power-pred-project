package powerplant.powerpred.building;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {

    List<Building> findByUseridAndTrained(String id, boolean trained);

    List<Building> findByTrained(boolean trained);

    List<Building> findByAdminID(String adminId);

    Building findByName(String name);
}
