package powerplant.powerpred.building;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import powerplant.powerpred.account.Account;

@Service
@RequiredArgsConstructor
public class BuildingService {

    private final BuildingRepository buildingRepository;
    private final HttpSession session;
    private static long sequence = 0L;

    /**
     * 데이터 업로드 :: 건물 정보 저장
     */
    public Long upload(String buildingName) {
        Building building = new Building(
                ++sequence,
                buildingName,
                ((Account)session.getAttribute("account")).getId()
        );
        buildingRepository.save(building);

        return building.getId();
    }

}
