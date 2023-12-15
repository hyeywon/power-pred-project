package powerplant.powerpred.building;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import powerplant.powerpred.account.Account;

import java.util.List;
import java.util.Optional;

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
                ((Account) session.getAttribute("account")).getId()
        );
        buildingRepository.save(building);

        return building.getId();
    }

    @Autowired
    public BuildingService(BuildingRepository buildingRepository) {
        this.buildingRepository = buildingRepository;
    }

    public Optional<String> getPredictedCsvByBuildingId(Long buildingId) {
        // 예측된 CSV 파일 경로를 데이터베이스에서 가져오는 로직을 추가
        Optional<Building> buildingOptional = buildingRepository.findById(buildingId);

        return buildingOptional.map(Building::getCsv);
    }

    public List<Building> getAllBuildings() {
        // 모든 csv 파일을 불러오기
        return buildingRepository.findAll();
    }

    public Optional<String> getCsvByUserId(String userId) {
        // 유저 아이디로 csv 파일 불러오기
        Optional<Building> buildingOptional = buildingRepository.findByUserid(userId);

        return buildingOptional.map(Building::getCsv);
    }
}
