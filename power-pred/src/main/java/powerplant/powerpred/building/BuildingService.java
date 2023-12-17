package powerplant.powerpred.building;

import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;
import javax.sql.rowset.serial.SerialBlob;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import powerplant.powerpred.power.Power;
import powerplant.powerpred.power.PowerRepository;
import powerplant.powerpred.response.AdminFile;
import powerplant.powerpred.response.BuildingInfo;
import powerplant.powerpred.response.PowerData;

@Service
@RequiredArgsConstructor
@Slf4j
public class BuildingService {

    private final BuildingRepository buildingRepository;
    private final PowerRepository powerRepository;
    private final HttpSession session;
    private static long sequence = 0L;

    /**
     * 데이터 업로드 :: 건물 정보 저장
     */
    @Transactional
    public Long upload(String buildingName, MultipartFile csv) {

        if ((Boolean) session.getAttribute("isAdmin")) {
            Building findBuilding = buildingRepository.findByName(buildingName);
            findBuilding.setTrained(true);
            findBuilding.setAdminID((String) session.getAttribute("id"));

            return findBuilding.getId();
        }

        Building building = new Building();
        try {
            building = new Building(
                    ++sequence,
                    buildingName,
                    (String) session.getAttribute("id"),
                    false,
                    null,
                    new SerialBlob(csv.getBytes())
            );
        } catch (Exception e) {
            log.info(e.getMessage());
        }
        buildingRepository.save(building);

        return building.getId();
    }

    /**
     * 데이터 조회 :: Administrator
     */
    public AdminFile adminView() {
        log.info("is admin "  +  session.getAttribute("isAdmin"));
        List<Blob> trainData = buildingRepository.findByTrained(false).stream()
                .map(Building::getCsvFile)
                .toList();

        List<String> predictions = buildingRepository.findByAdminID((String) session.getAttribute("id")).stream()
                .map(Building::getName)
                .toList();

        return new AdminFile(trainData, predictions);
    }

    /**
     * 데이터 조회 :: User
     */
    public List<BuildingInfo> userView() {
        List<BuildingInfo> buildingInfos = new ArrayList<>();

        for (Building building : buildingRepository.findByUseridAndTrained((String) session.getAttribute("id"), true)) {
            List<Power> powers = powerRepository.findByBuildingID(building.getId());

            double totalPower = powers.stream()
                    .mapToDouble(Power::getPower)
                    .sum();

            List<PowerData> powerData = powers.stream()
                    .map(power -> new PowerData(power.getDateTime(), power.getPower()))
                    .toList();

            BuildingInfo buildingInfo = new BuildingInfo(
                    building.getName(),
                    powerData,
                    totalPower * 120
            );

            buildingInfos.add(buildingInfo);
        }
        return buildingInfos;
    }
}
