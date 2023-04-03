pragma solidity ^0.8.0;

//SPDX-License-Identifier: MIT

contract WeaponTracking {

    struct Weapon {
        uint256 serialNumber;
        address manufacturer;
        address distributor;
        address dealer;
        bool isAuthentic;
    }

    mapping(uint256 => Weapon) weapons;

    function createWeapon(uint256 _serialNumber, address _manufacturer) public {
        weapons[_serialNumber] = Weapon(_serialNumber, _manufacturer, address(0), address(0), false);
    }

    function addDistributor(uint256 _serialNumber, address _distributor) public {
        require(msg.sender == weapons[_serialNumber].manufacturer, "Only manufacturer can add distributor");
        weapons[_serialNumber].distributor = _distributor;
    }

    function addDealer(uint256 _serialNumber, address _dealer) public {
        require(msg.sender == weapons[_serialNumber].distributor, "Only distributor can add dealer");
        weapons[_serialNumber].dealer = _dealer;
    }

    function verifyAuthenticity(uint256 _serialNumber) public {
        require(msg.sender == weapons[_serialNumber].dealer, "Only dealer can verify authenticity");
        weapons[_serialNumber].isAuthentic = true;
    }

    function getWeapon(uint256 _serialNumber) public view returns (
        uint256 serialNumber,
        address manufacturer,
        address distributor,
        address dealer,
        bool isAuthentic
    ) {
        Weapon storage weapon = weapons[_serialNumber];
        return (
            weapon.serialNumber,
            weapon.manufacturer,
            weapon.distributor,
            weapon.dealer,
            weapon.isAuthentic
        );
    }
}
